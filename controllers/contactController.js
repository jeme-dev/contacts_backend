const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});


//@desc Create a new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res
    .status(200)
    .json({ req: req.body, message: "Contact created successfully" });
});
//@desc Get contacts by name (starts with)
//@route GET /api/contacts/name/:name
//@access private
const getSpecificContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ 
    name: { $regex: `^${req.params.name}`, $options: "i" }, 
    user_id: req.user.id 
  });

  // For .find(), check if the array is empty
  if (!contacts || contacts.length === 0) {
    res.status(404);
    throw new Error("No contacts found starting with that name");
  }

  res.status(200).json(contacts);
});

//@desc Update a specific contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id !== req.user.id){
    res.status(403)
    throw new Error("User don't have permission to update other user's contact")
    }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.status(200).json(updatedContact);
});

//@desc Delete a specific contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id !== req.user.id){
    res.status(403)
    throw new Error("User don't have permission to delete other user's contact")
  }

  await contact.deleteOne();
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  createContact,
  getSpecificContact,
  updateContact,
  deleteContact,
};
