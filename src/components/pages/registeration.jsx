  import React, { useState, useEffect } from 'react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import './registration.css';
  import axios from 'axios';
  import { Helmet } from 'react-helmet';
  function getCookie(name) {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
  }

  const RegistrationForm = () => {
    const initialFormState = {
      pet_category: "",
      pet_name: "",
      owner_name: "",
      owner_email: "",
      owner_phone: "",
      owner_address: "",
      emirates_id: "",
      pet_photo: null,
      breed: "",
      age: "",
      gender: "",
      microchip_number: "",
      passport_vaccine: null,
      special_needs: "",
      weight_class: "",
      spayed_neutered: "",
      attended_similar_events: "",
      comfortable_in_crowds: "",
      socialized_with_pets_people: "",
      category_id: null,
      weight: "",
      pet_trick_competition: false,
      pet_photo_competition: false,
      instagram:'',
    };

     const [isOtherCompetitions, setIsOtherCompetitions] = useState("No");
     const [selectedCompetitions, setSelectedCompetitions] = useState([]);
     const [showTermsModal, setShowTermsModal] = useState(false);
    const [currentTerms, setCurrentTerms] = useState("");
    


    const [formData, setFormData] = useState(initialFormState);
    const [petCategories, setPetCategories] = useState([]);
    const [weightClasses, setWeightClasses] = useState([]);
    const [catId, setCatId] = useState(null); // State to store Cat ID
    const [dogId, setDogId] = useState(null); // State to store Dog ID

    // Fetch pet categories from the API on component load
    useEffect(() => {
      axios
        .get("http://localhost:8000/api/category/")
        .then((response) => {
          console.log("Pet Categories fetched:", response.data);
          setPetCategories(response.data); // Set pet categories

          // Set dynamic IDs for Cat and Dog based on the fetched categories
          const catCategory = response.data.find(
            (category) => category.name.toLowerCase() === "cat"
          );
          const dogCategory = response.data.find(
            (category) => category.name.toLowerCase() === "dog"
          );

          setCatId(catCategory ? catCategory.id : null);
          setDogId(dogCategory ? dogCategory.id : null);
        })
        .catch((error) => {
          console.error("Error fetching pet categories:", error);
        });
    }, []);

    // Fetch weight classes based on the selected pet category
    useEffect(() => {
      if (formData.category_id) {
        console.log('Fetching weight classes for category ID:', formData.category_id);
        axios
          .get(
            `http://localhost:8000/api/weight_classes/${formData.category_id}/`
          ) //  API URL
          .then((response) => {
            console.log("Weight classes response:", response.data);
            if (response.data.length > 0) {
              setWeightClasses(response.data);
            } else {
              console.warn("No weight classes found for this category");
            }
          })
          .catch((error) => {
            console.error("Error fetching weight classes:", error);
          });
      }
    }, [formData.category_id]);



   const compressImage = (file, maxWidth, maxHeight, quality) => {
     return new Promise((resolve, reject) => {
       const reader = new FileReader();

       reader.onload = (event) => {
         const img = new Image();
         img.src = event.target.result;

         img.onload = () => {
           const canvas = document.createElement("canvas");
           let width = img.width;
           let height = img.height;

           // Calculate new dimensions if necessary
           if (width > maxWidth || height > maxHeight) {
             if (width > height) {
               height = Math.round((height *= maxWidth / width));
               width = maxWidth;
             } else {
               width = Math.round((width *= maxHeight / height));
               height = maxHeight;
             }
           }

           canvas.width = width;
           canvas.height = height;

           const ctx = canvas.getContext("2d");
           ctx.drawImage(img, 0, 0, width, height);

           canvas.toBlob(
             (blob) => {
               resolve(blob);
             },
             "image/jpeg",
             quality
           );
         };

         img.onerror = (error) => {
           reject(error);
         };
       };

       reader.readAsDataURL(file);
     });
   };

    
const handleCheckboxChange = (e) => {
  const { name, checked } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [name]: checked, // Update the Boolean value for the checkbox
  }));
};







   // Handle input change
const handleChange = async (e) => {
  const { name, value, files } = e.target;

  // Handle file inputs separately for compression and PDF handling
  if (name === "pet_photo" || name === "passport_vaccine") {
    const file = files[0]; // Get the selected file

    if (file) {
      try {
        if (file.type.startsWith("image/")) {
          // Compress the image if it's an image file
          const compressedImage = await compressImage(file, 1024, 1024, 0.8);
          const compressedFile = new File([compressedImage], file.name, {
            type: file.type,
          });

          setFormData((prevData) => ({
            ...prevData,
            [name]: compressedFile, // Update the state with the compressed image
          }));
        } else if (file.type === "application/pdf") {
          // Directly set the PDF file without compressing
          setFormData((prevData) => ({
            ...prevData,
            [name]: file, // Update the state with the PDF file
          }));
        } else {
          // Handle unsupported file types
          console.error("Unsupported file type:", file.type);
          alert("Please upload a valid image or PDF file.");
        }
      } catch (error) {
        console.error("Error processing file:", error);
      }
    } else {
      // If no file is selected, keep the state as null
      setFormData((prevData) => ({
        ...prevData,
        [name]: null, // Ensure the field is set to null when no file is selected
      }));
    }
  } else {
    // For non-file inputs, just update the state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // If the pet category changes, update the category ID
  if (name === "pet_category") {
    const selectedCategory = petCategories.find(
      (category) => category.id === parseInt(value)
    );
    if (selectedCategory) {
      setFormData((prevData) => ({
        ...prevData,
        category_id: selectedCategory.id,
      }));
      console.log("Selected Pet Category ID:", selectedCategory.id);
    }
  }
};



const handleSubmit = (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Validate that at least one competition is selected if "Yes" is chosen
  if (
    isOtherCompetitions === "yes" &&
    !formData.pet_trick_competition &&
    !formData.pet_photo_competition
  ) {
    toast.error("Please select at least one competition before registering.");
    return; // Stop form submission if validation fails
  }

  // Prepare FormData for submission
  const data = new FormData();

  // Append all form data (including file uploads) to FormData
  Object.keys(formData).forEach((key) => {
    if (formData[key] !== null && formData[key] !== undefined) {
      data.append(key, formData[key]);
    }
  });

  console.log("Submitting data:", Array.from(data.entries())); // For debugging

  // Make the API call to submit the form data
  fetch("http://127.0.0.1:8000/api/pet-registration/", {
    method: "POST",
    body: data,
    headers: {
      "X-CSRFToken": getCookie("csrftoken"), // Include CSRF token if required by your backend
    },
  })
    .then((response) => response.json()) // Parse the JSON response
    .then((responseData) => {
      if (responseData.success) {
        toast.success(
          responseData.message || "Registration submitted successfully!"
        );
        setFormData(initialFormState); // Reset form after successful submission
      } else {
        toast.error(
          responseData.error || "Submission failed. Please try again."
        );
      }
    })
    .catch((error) => {
      console.error("Error during submission:", error);
      toast.error("Form submission failed. Please try again.");
    });
};











    const isCatOrDog = () => {
      const selectedCategoryId = formData.category_id;
      return selectedCategoryId === catId || selectedCategoryId === dogId; // Check against dynamic IDs
    };


    return (
      <React.Fragment>
        <Helmet>
          <title>Register for the Top Pet Parents Fest 2025 by WonderMom</title>
          <meta
            name="description"
            content="Join the Pet Parents Fest 2025! Register your pets for fun activities and expert tips in pet care and training for all pet lovers."
          />
        </Helmet>

        <section
          className="section"
          id="reservation"
          style={{ backgroundImage: "url(/images/reg.webp)" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-5 align-self">
                <div className="left-text-content">
                  <div className="section-heading">
                    <h6>Pet Parents Fest 2025 by wondermom</h6>
                    <h2>Register your Pet for the event!</h2>
                  </div>
                  <p style={{ marginBottom: "15px" }}>
                    Join us for an unforgettable experience at the Pet Parents
                    Fest 2025, taking place on January 11th & 12th, 2025! Secure
                    your spot today and be part of a community that celebrates
                    the joy of pets.
                  </p>
                  <p style={{ marginBottom: "30px" }}>
                    For any questions or assistance regarding registration, feel
                    free to reach out to us at +971 54 508 3789 or{" "}
                    <a
                      href="https://wa.me/+971569066391"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      click here
                    </a>{" "}
                    to WhatsApp us.
                  </p>
                  <p style={{ lineHeight: "30px" }}>
                    <b>
                      <u>Event Details</u>
                    </b>
                    <br />
                    Dates: January 11th & 12th, 2025!
                    <br />
                    Venue: To be announced soon (Dubai)
                  </p>
                  <div className="terms-conditions">
                    <div className="scrollable-box">
                      <h2 className="section-heading">Terms & Conditions</h2>
                      <ul>
                        <li>
                          All participating pets should enter through the
                          designated entrance at the venue.
                        </li>
                        <li>
                          All pets must undergo a vet check and provide proof of
                          vaccination (Pet Passport or a letter from a reputable
                          veterinary clinic must be sent in advance).
                          Vaccination should have been done within the last 2
                          years.
                        </li>
                        <li>
                          All pets will be checked by our official vets for
                          health conditions.
                        </li>
                        <li>
                          All dogs must pass through the Dog Assessment Area and
                          collect color-coded ribbons issued by the assessment
                          team.
                        </li>
                        <li>
                          The ribbons must be worn by the dogs throughout their
                          time at the venue.
                        </li>
                        <li>
                          Dogs must always be on a leash. No extendable leashes
                          are permitted in the venue.
                        </li>
                      </ul>
                      <h2>Undertaking</h2>
                      <p>
                        Pet owners accept full responsibility for their pets and
                        will compensate for any damages caused by their pets.
                        The owners bring their animals at their own risk. The
                        organizer or officials will not be responsible for the
                        actions of the pets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <div
                  className="contact-form"
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                  }}
                >
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="reg-title">PET REGISTRATION</h4>
                      </div>

                      <div className="col-lg-6 col-sm-12">
                        <select
                          name="pet_category"
                          value={formData.pet_category}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Pet Category *</option>
                          {petCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-lg-6 col-sm-12">
                        <input
                          name="pet_name"
                          type="text"
                          value={formData.pet_name}
                          onChange={handleChange}
                          placeholder="Name of the Pet *"
                          required
                        />
                      </div>

                      <div className="col-lg-6 col-sm-12">
                        <input
                          name="owner_name"
                          type="text"
                          value={formData.owner_name}
                          onChange={handleChange}
                          placeholder="Name of Registered Owner *"
                          required
                        />
                      </div>

                      <div className="col-lg-6 col-sm-12">
                        <input
                          name="owner_email"
                          type="email"
                          value={formData.owner_email}
                          onChange={handleChange}
                          placeholder="Email *"
                          required
                        />
                      </div>

                      <div className="col-lg-6 col-sm-12">
                        <input
                          name="owner_phone"
                          type="text"
                          value={formData.owner_phone}
                          onChange={handleChange}
                          placeholder="Phone Number *"
                          required
                        />
                      </div>

                      <div className="col-lg-6 col-sm-12">
                        <input
                          name="owner_address"
                          type="text"
                          value={formData.owner_address}
                          onChange={handleChange}
                          placeholder="Address *"
                          required
                        />
                      </div>

                      <div className="col-lg-6 col-sm-12">
                        <input
                          name="emirates_id"
                          type="text"
                          value={formData.emirates_id}
                          onChange={handleChange}
                          placeholder="Emirates ID *"
                          required
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <input
                          name="microchip_number"
                          type="text"
                          value={formData.microchip_number}
                          onChange={handleChange}
                          placeholder="Microchip Number *"
                          required
                        />
                      </div>

                      <div className="col-lg-4 col-sm-12">
                        <input
                          name="breed"
                          type="text"
                          value={formData.breed}
                          onChange={handleChange}
                          placeholder="Breed *"
                          required
                        />
                      </div>

                      <div className="col-lg-4 col-sm-12">
                        <input
                          name="age"
                          type="text"
                          value={formData.age}
                          onChange={handleChange}
                          placeholder="Age (in years) *"
                          required
                        />
                      </div>

                      <div className="col-lg-4 col-sm-12">
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Gender *</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div className="col-lg-6 col-sm-12">
                        <select
                          name="attended_similar_events"
                          value={formData.attended_similar_events}
                          onChange={handleChange}
                          required
                        >
                          <option value="">
                            Have you attended similar events? *
                          </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>

                      <div className="col-lg-6 col-sm-12">
                        <select
                          name="comfortable_in_crowds"
                          value={formData.comfortable_in_crowds}
                          onChange={handleChange}
                          required
                        >
                          <option value="">
                            Is your pet comfortable in crowds? *
                          </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>

                      <div className="col-lg-12 col-sm-12">
                        <select
                          name="socialized_with_pets_people"
                          value={formData.socialized_with_pets_people}
                          onChange={handleChange}
                          required
                        >
                          <option value="">
                            Is your pet socialized with pets and people? *
                          </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>

                      {/* Show weight class only for Cat or Dog */}
                      {isCatOrDog() ? (
                        <div className="col-lg-6 col-sm-12">
                          <select
                            name="weight_class"
                            value={formData.weight_class}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Weight Class *</option>
                            {weightClasses.map((weightClass) => (
                              <option
                                key={weightClass.id}
                                value={weightClass.id}
                              >
                                {weightClass.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="col-lg-12 col-sm-12">
                          <input
                            name="weight"
                            type="text"
                            value={formData.weight}
                            onChange={handleChange}
                            placeholder="Weight"
                          />
                        </div>
                      )}

                      <div className="col-lg-6 col-sm-12">
                        {isCatOrDog() && ( // Only show for Cat or Dog
                          <select
                            name="spayed_neutered"
                            value={formData.spayed_neutered}
                            onChange={handleChange}
                          >
                            <option value="">Spayed/Neutered? *</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        )}
                      </div>
                      <div className="col-lg-12 col-sm-12">
                        <input
                          name="instagram"
                          type="text"
                          value={formData.instagram}
                          onChange={handleChange}
                          placeholder="Instagram Link *"
                          required
                        />
                      </div>
                      <div className="col-lg-12 col-sm-12">
                        <label
                          htmlFor="pet_photo"
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            textAlign: "left",
                          }}
                        >
                          Upload Pet Photo
                        </label>
                        <input
                          name="pet_photo"
                          type="file"
                          id="pet_photo" // Assigning an id for the label to reference
                          accept=".pdf, .doc, .docx, .txt, .rtf, .odt, .xls, .xlsx, .ppt, .pptx, .jpg, .jpeg, .png, .gif, .bmp, .svg, .webp, .tif, .tiff"
                          onChange={handleChange}
                          required
                          style={{
                            border: "1px solid #ccc",
                            paddingTop: "10px",
                            borderRadius: "4px",
                          }}
                        />
                      </div>

                      <div className="col-lg-12 col-sm-12">
                        <label
                          htmlFor="passport_vaccine"
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            textAlign: "left",
                          }}
                        >
                          Upload Passport Vaccine
                        </label>
                        <input
                          name="passport_vaccine"
                          type="file"
                          id="passport_vaccine"
                          onChange={handleChange}
                          required
                          accept=".pdf, .doc, .docx, .txt, .rtf, .odt, .xls, .xlsx, .ppt, .pptx, .jpg, .jpeg, .png, .gif, .bmp, .svg, .webp, .tif, .tiff"
                          style={{
                            border: "1px solid #ccc",
                            paddingTop: "10px",
                            borderRadius: "4px",
                          }}
                        />
                      </div>

                      <div className="col-lg-12 col-sm-12">
                        <textarea
                          name="special_needs"
                          type="text"
                          value={formData.special_needs}
                          onChange={handleChange}
                          placeholder="Special Needs (if any)"
                        />
                      </div>

                      <div className="col-lg-12 col-sm-12">
                        <select
                          id="isOtherCompetitions"
                          name="isOtherCompetitions"
                          value={isOtherCompetitions}
                          onChange={(e) =>
                            setIsOtherCompetitions(e.target.value)
                          }
                          required
                          className="form-control"
                        >
                          <option value="">
                            Register for Other Competitions? *
                          </option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>

                        {/* Conditional rendering of competition selection */}
                        {isOtherCompetitions === "yes" && (
                          <div
                            className="col-lg-12 col-sm-12 mt-3"
                            style={{ textAlign: "left" }}
                          >
                            <label>Select Competitions *</label>

                            {/* Pet Trick Competition */}
                            <div className="custom-checkbox">
                              <input
                                type="checkbox"
                                id="pet_trick_competition"
                                name="pet_trick_competition"
                                checked={formData.pet_trick_competition}
                                onChange={(e) =>
                                  setFormData((prevData) => ({
                                    ...prevData,
                                    pet_trick_competition: e.target.checked,
                                  }))
                                }
                                className="custom-checkbox-input"
                              />
                              <label
                                htmlFor="pet_trick_competition"
                                className="custom-checkbox-label"
                              >
                                Pet Trick Competition
                              </label>
                            </div>

                            {/* Pet Photo Competition */}
                            <div className="custom-checkbox">
                              <input
                                type="checkbox"
                                id="pet_photo_competition"
                                name="pet_photo_competition"
                                checked={formData.pet_photo_competition}
                                onChange={(e) =>
                                  setFormData((prevData) => ({
                                    ...prevData,
                                    pet_photo_competition: e.target.checked,
                                  }))
                                }
                                className="custom-checkbox-input"
                              />
                              <label
                                htmlFor="pet_photo_competition"
                                className="custom-checkbox-label"
                              >
                                Pet Photo Competition
                              </label>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="col-lg-6 col-sm-12">
                              <button
                                type="button"
                                className="btn btn-primary mt-2"
                                style={{
                                  width: "200px",
                                  padding: "5px",
                                  backgroundColor: "#007bff",
                                }}
                                onClick={() => {
                                  // Generate terms based on the selected competitions
                                  const terms = [];
                                  if (formData.pet_trick_competition) {
                                    terms.push(
                                      <>
                                        <span
                                          style={{
                                            color: "red",
                                            
                                          }}
                                        >
                                          <u>
                                            <b>Pet Trick Competition</b>
                                          </u>
                                        </span>
                                        <ul>
                                          
                                          <li style={{ listStyleType: "disc" }}>
                                            Submit your pet's trick video via
                                            WhatsApp at{" "}
                                            <a
                                              href="https://wa.me/971569064547"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              +971 56 9064547
                                            </a>
                                            .
                                          </li>
                                          <li style={{ listStyleType: "disc" }}>
                                            We will collaborate with you to
                                            share your video on our
                                            Instagram/Facebook.
                                          </li>
                                          <li style={{ listStyleType: "disc" }}>
                                            The winner will be announced live at
                                            the event, based on the most likes
                                            and comments.
                                          </li>
                                        </ul>
                                      </>
                                    );
                                  }
                                  if (formData.pet_photo_competition) {
                                    terms.push(
                                      <>
                                        <br />
                                        <span
                                          style={{
                                            color: "red",
                                            paddingLeft: "10px",
                                          }}
                                        >
                                          <u>
                                            <b>Pet Photo Competition</b>
                                          </u>
                                        </span>
                                        <ul>
                                        
                                          <li style={{ listStyleType: "disc" }}>
                                            Submit your pet photo in person at
                                            the event.
                                          </li>
                                          <li style={{ listStyleType: "disc" }}>
                                            Photo must be printed in 4x6 size.
                                          </li>
                                          <li style={{ listStyleType: "disc" }}>
                                            The winner will be announced live at
                                            the event.
                                          </li>
                                        </ul>
                                      </>
                                    );
                                  }
                                  if (terms.length === 0) {
                                    terms.push(
                                      "All participating pets should enter through the designated entrance at the venue.",
                                      "All pets must undergo a vet check and provide proof of vaccination (Pet Passport or a letter from a reputable veterinary clinic must be sent in advance). Vaccination should have been done within the last 2 years.",
                                      "All pets will be checked by our official vets for health conditions.",
                                      "All dogs must pass through the Dog Assessment Area and collect color-coded ribbons issued by the assessment team.",
                                      "The ribbons must be worn by the dogs throughout their time at the venue.",
                                      "Dogs must always be on a leash. No extendable leashes are permitted in the venue.",
                                    );
                                  }

                                  setCurrentTerms(terms);
                                  setShowTermsModal(true);
                                }}
                              >
                                View Terms and Conditions
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {showTermsModal && (
                        <div className="modal-overlay">
                          <div
                            className="custom-modal"
                            style={{
                              maxHeight: "90vh",
                              overflowY: "auto",
                            }}
                          >
                            <h3>Terms and Conditions</h3>
                            <br />
                            <ul style={{ paddingLeft: "30px" }}>
                              {currentTerms.map((term, index) => (
                                <li
                                  style={{
                                    textAlign: "left",
                                   
                                  }}
                                  key={index}
                                >
                                  {term}
                                </li>
                              ))}
                              <br />
                            </ul>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setShowTermsModal(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="col-lg-12 mt-4">
                        <button type="submit">Register Now</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </section>
      </React.Fragment>
    );
  };

  export default RegistrationForm;
