import { Form } from "react-router-dom";

// type user = {
//     first: string,
//     last: string,
//     avatar: string,
//     twitter: string,
//     notes: string,
//     favorite: boolean,
//   };

export default function Suitcase() {
  const user = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };

  return (
    <div id="user">
      <span>"THIS YOUR SUITCASE"</span>
      {/* <div>
        <img
          key={user.avatar}
          src={user.avatar}
        />
      </div>

      <div>
        <h1>
          {user.first || user.last ? (
            <>
              {user.first} {user.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
        </h1>

        {user.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${user.twitter}`}
            >
              {user.twitter}
            </a>
          </p>
        )}

        {user.notes && <p>{user.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div> */}
    </div>
  );
}

// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });