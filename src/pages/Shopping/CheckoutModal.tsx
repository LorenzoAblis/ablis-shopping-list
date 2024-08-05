import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Item } from "../../interfaces";
import { remove } from "../../firebase";
import { useMutation, useQueryClient } from "react-query";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
}

const CheckoutModal = ({ isOpen, onClose, items }: AddItemModalProps) => {
  const queryClient = useQueryClient();

  const handleCheckout = async () => {
    mutation.mutate();
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const itemsToRemove = items.filter((item) => item.completed);

      for (const item of itemsToRemove) {
        await remove(`shopping_items/${item.name}.json`);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch the query
      queryClient.invalidateQueries(["items"]);
      onClose();
    },
    onError: (err: Error) => {
      console.error(err);
      //   TODO: Handle errors
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalOverlay />
      <ModalContent borderRadius={20}>
        <ModalHeader fontSize={25}>Cart</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {items
            .filter((item) => item.completed)
            .map((item, index) => (
              <List key={index}>
                <ListItem fontSize={18}>
                  {item.quantity} x {item.name}
                </ListItem>
              </List>
            ))}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={handleCheckout}>
            Checkout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CheckoutModal;
