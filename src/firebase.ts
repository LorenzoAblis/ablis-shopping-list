const databaseURL = import.meta.env.VITE_FIREBASE_URL;

export async function update(path: string, data: string) {
  await fetch(`${databaseURL}/${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
}

export async function write(path: string, data: string) {
  await fetch(`${databaseURL}/${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
}

export async function remove(path: string) {
  await fetch(`${databaseURL}/${path}`, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
