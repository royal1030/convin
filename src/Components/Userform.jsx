import { useState } from "react";
import { TextField, Button } from "@mui/material";

const UserForm = ({ onAddUser, onClose }) => {
  const [name, setName] = useState("");
  const [link, setlink] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = { name, link };
    onAddUser(newUser);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Link"
        value={link}
        onChange={(event) => setlink(event.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add User
      </Button>
      <Button onClick={onClose} color="secondary">
        Cancel
      </Button>
    </form>
  );
};

export default UserForm;
