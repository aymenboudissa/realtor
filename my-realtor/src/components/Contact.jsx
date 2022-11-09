import { doc, getDoc } from "firebase/firestore";
import React, { useRef } from "react";
import { db } from "../firebase";

const Contact = ({ id, product }) => {
  const form = useRef();
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "users", id);
      const querySnap = await getDoc(docRef);
      if (querySnap.exists()) {
        setUser(querySnap.data());
      }
    }
    fetchListing();
  }, []);

  const [message, setMessage] = React.useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
    e.target.reset();
  };
  return (
    <div className="text-hidden">
      {user && (
        <>
          <p>
            Contact for {user.name} the {product}
          </p>
          <textarea
            onChange={(e) => sendEmail(e)}
            className="text__area"
            name="message"
            id="send__area"
            placeholder="Message"
          ></textarea>
          <a
            href={`mailto:${user.email}?subject${user.name}&body=${message}`}
            className="btn__message"
            id="btn__send"
          >
            Send Message
          </a>
        </>
      )}
    </div>
  );
};

export default Contact;
