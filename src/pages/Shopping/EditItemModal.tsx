import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Input,
  Container,
  HStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Item } from "../../interfaces";
import { remove, write } from "../../firebase";
import { useMutation, useQueryClient } from "react-query";

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit: Item | null;
  setItemToEdit: (item: Item | null) => void;
}

const EditItemModal = ({ isOpen, onClose, itemToEdit }: EditItemModalProps) => {
  const queryClient = useQueryClient();
  const [newItem, setNewItem] = useState<Item>({
    name: "",
    quantity: 0,
    completed: false,
    store: "",
    description: "",
  });

  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (item: Item) => {
      if (itemToEdit) {
        // Remove the old item
        await remove(`shopping_items/${itemToEdit.name}.json`);
      }
      // Write the new item
      await write(`shopping_items/${item.name}.json`, JSON.stringify(item));
    },
    onSuccess: () => {
      // Invalidate and refetch the query
      queryClient.invalidateQueries(["items"]);
      onClose();
    },
    onError: (err: Error) => {
      console.error(err);
      setError("Failed to update item. Please try again.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));

    if (error) {
      setError(null);
    }
  };

  const handleEdit = () => {
    if (newItem.name.trim() === "") {
      setError("Name is required.");
      return;
    }

    mutation.mutate(newItem);
  };

  useEffect(() => {
    if (isOpen && itemToEdit) {
      setNewItem(itemToEdit);
    } else {
      setNewItem({
        name: "",
        quantity: 0,
        completed: false,
        store: "",
        description: "",
      });
    }
  }, [isOpen, itemToEdit]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalOverlay />
      <ModalContent pb={5} borderRadius={20}>
        <ModalHeader fontSize={25}>Edit Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column">
          <Container display="flex" flexDirection="column" p={0} gap={5}>
            <FormControl isInvalid={!!error} isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleChange}
              />
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
            <HStack>
              <FormControl w={20}>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl w={80}>
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  name="store"
                  value={newItem.store}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={newItem.description}
                onChange={handleChange}
              />
            </FormControl>
          </Container>
          <Button colorScheme="green" mt={10} onClick={handleEdit}>
            <CheckIcon />
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditItemModal;
