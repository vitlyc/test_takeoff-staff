import "./contact.scss";
import { BiTrashAlt, BiUserPlus, BiEditAlt, BiSave } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { deleteContact, patchContact } from "../../utils/Api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeContactFromMap } from "../../store/contacts/contacts.action";

const Contact = ({ contact }) => {
  const [isInputsDisabled, setInputsDisabled] = useState(true);
  const [inputs, setInputs] = useState(contact);
  const contacts = useSelector((state) => state.contacts.contactsMap);
  const dispatch = useDispatch();

  const { name, email, phone, id } = contact;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleEditContact = () => {
    setInputsDisabled(!isInputsDisabled);
    setInputs(contact);
  };

  const blockInputs = () => {
    setInputs(contact);
    setInputsDisabled(true);
  };
  const ref = useDetectClickOutside({ onTriggered: blockInputs });

  const handleSaveContact = () => {
    patchContact(inputs);
    setInputs(inputs);
    console.log(inputs);
    setInputsDisabled(true);
  };

  const handleDeleteContact = () => {
    console.log("delete");
    deleteContact(id).then((res) => console.log(res));
    dispatch(removeContactFromMap(contacts, contact));
  };

  return (
    <div className="contact-container" ref={ref}>
      <div className="fields">
        <input
          name="name"
          type="text"
          disabled={isInputsDisabled}
          value={inputs.name}
          onChange={handleInputChange}
        />
        <input
          name="email"
          type="text"
          disabled={isInputsDisabled}
          value={inputs.email}
          onChange={handleInputChange}
        />
        <input
          name="phone"
          type="text"
          disabled={isInputsDisabled}
          value={inputs.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="buttons">
        <BiEditAlt onClick={() => handleEditContact()} />

        <BiTrashAlt onClick={() => handleDeleteContact()} />

        {!isInputsDisabled ? <BiSave onClick={() => handleSaveContact()} /> : ""}
      </div>
    </div>
  );
};
export default Contact;
