import React from "react";
import Dropdown from "react-bootstrap/esm/Dropdown";

export default function DropdownMenu({ handleDelete, handleEdit }) {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          className="dropdown-toggle-split"
          variant="transparent"
          id="dropdown-basic"
        ></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleDelete} className="dropdown-menu-item">
            Delete
          </Dropdown.Item>
          <Dropdown.Item onClick={handleEdit} className="dropdown-menu-item">
            Edit
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
