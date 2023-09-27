import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Navbar from "./Navbar.jsx";
import Like from "./Like.jsx";
import List from "./List.jsx";
import AccordionItem from "./AccordionItem.jsx";
import Button from "react-bootstrap/Button";
import Loading from "./Loading.jsx";
import Footer from "./Footer.jsx";
import Modal from "react-bootstrap/Modal";

function App() {
  const [likes, setLikes] = useState([]);
  const [cat, setCat] = useState([]);
  const [sortedlikes, setsortedlikes] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const list = useRef(null);
  const [lgShow, setLgShow] = useState(false);

  window.fbAsyncInit = function () {
    FB.init({
      appId: "299759139419557",
      cookie: true,
      xfbml: true,
      version: "v0.18",
    });
  };
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function login() {
    FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("User is logged in and granted permissions.");
          fetchLikes(
            "me/likes?fields=fan_count,link,category,picture{url},name"
          );
        } else {
          console.log("User canceled login or did not grant permissions.");
        }
      },
      { scope: "public_profile,email" }
    );
  }
  let likesA = [];
  function fetchLikes(url) {
    setIsLoading(true);
    FB.api(url, function (response) {
      likesA = likesA.concat(response.data);
      if (response.paging && response.paging.next) {
        // If there is a 'next' URL, fetch the next batch of likes
        fetchLikes(response.paging.next);
      } else {
        // No more likes to retrieve
        setLikes(likesA);
        const sortedDataCopy = [...likesA].sort(
          (a, b) => b.fan_count - a.fan_count
        );
        setsortedlikes(sortedDataCopy);
        /* for (var i = 0; i < likes.length; i++) {
          if (cat.indexOf(likes[i].category) == -1) {
            setCat(cat.push(likes[i].category));
          }
        }*/
        const newCat = []; // Create a copy of the current cat array
        for (var i = 0; i < likesA.length; i++) {
          if (newCat.indexOf(likesA[i].category) === -1) {
            newCat.push(likesA[i].category); // Update the copy of the array
          }
        }
        setCat(newCat);
        setIsLoading(false);
        setIsFetched(true);
      }
    });
  }
  return (
    <>
      <Navbar islogged={isFetched} likes={likes} />
      {isLoading && <Loading />}
      {!isFetched && (
        <div className="row justify-content-center mt-5">
          <Button
            className="mt-5 col-9 p-3  rounded-pill fs-4"
            onClick={login}
            variant="primary"
            size="lg"
            disabled={isLoading}
          >
            <img className="mx-3" src="fb.svg" alt="" />
           <strong>Login with Facebook</strong> 
          </Button>
          <a
            className=" mt-4 col-9 p-3 rounded-pill text-center fs-4"
            onClick={() => setLgShow(true)}
          >
            <strong>Privacy Policy</strong>
          </a>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Privacy Policy
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h1>Privacy Policy for OrganizedLikes</h1>
              <p>
                <em>Effective Date: 18/09/2023</em>
              </p>

              <h2>1. Introduction</h2>
              <p>
                Welcome to OrganizedLikes. We are committed to protecting your
                privacy and ensuring the security of your personal information.
                This Privacy Policy explains how we collect, use, and protect
                the information you provide to us when using our app.
              </p>

              <h2>2. Information We Collect</h2>
              <p>
                <strong>Facebook Data:</strong> When you connect your Facebook
                account to OrganizedLikes, we request access to certain
                information from your Facebook profile, such as your name, email
                address, and pages you've liked. We also access and collect data
                about the pages you've liked, including their name, number of
                likes, and category.
              </p>

              <h2>3. How We Use Your Information</h2>
              <p>
                We use the information we collect from your Facebook account for
                the following purposes:
              </p>
              <ul>
                <li>
                  <strong>Displaying Liked Pages:</strong> OrganizedLikes
                  retrieves and displays pages you've liked on Facebook, ordered
                  by their category and the number of likes they have received.
                </li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We take reasonable measures to protect your information from
                unauthorized access or disclosure. However, no method of data
                transmission over the internet or method of electronic storage
                is entirely secure, and we cannot guarantee the absolute
                security of your data.
              </p>

              <h2>5. Sharing of Information</h2>
              <p>
                We do not share your personal information with third parties
                unless required by law or as outlined in this Privacy Policy.
              </p>

              <h2>6. Your Choices</h2>
              <p>
                You can manage the permissions you grant to OrganizedLikes by
                adjusting your Facebook settings. You may also disconnect your
                Facebook account from OrganizedLikes at any time.
              </p>

              <h2>7. Changes to this Privacy Policy</h2>
              <p>
                We may update this Privacy Policy to reflect changes in our
                practices or for other operational, legal, or regulatory
                reasons. We will provide notice of any material changes on our
                website or within the app.
              </p>

              <h2>8. Open Source</h2>
              <p>
                OrganizedLikes is an open-source project. You can access the
                source code and contribute to its development on GitHub. Click{" "}
                <a
                  href="https://github.com/AdamKourchi/OrganizedLike"
                  target="_blank"
                >
                  here
                </a>{" "}
                to visit the GitHub repository.
              </p>

              <h2>9. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or
                your data, please contact us at agadirdimo@gmail.com.
              </p>
            </Modal.Body>
          </Modal>
        </div>
      )}
      {isFetched && (
        <div className="container-fluid p-0 m-0">
          <div className="row">
            <div className="d-flex justify-content-between align-items-center">
              <Form className="m-3">
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  label="Categories Filter"
                  onChange={() => setIsFiltered(!isFiltered)}
                />
              </Form>
              <Button
                className="d-block d-md-none m-3"
                onClick={() => scrollToSection(list)}
                variant="primary"
              >
                Jump to Top Pages
              </Button>
            </div>
            {!isFiltered && (
              <div className="row m-0 m-md-3  col-12 col-md-7">
                <h1 className="text-center">Liked Pages:</h1>
                {likes.map((page) => (
                  <Like
                    key={page.id}
                    name={page.name}
                    fan_count={page.fan_count}
                    picture={page.picture.data.url}
                    link={page.link}
                  />
                ))}
              </div>
            )}
            {isFiltered && (
              <div className=" m-0 m-md-3 col-12 col-md-7">
                <h1 className="text-center">Categories Pages:</h1>
                <Accordion>
                  {cat.map((el) => (
                    <AccordionItem key={el} title={el} likes={likes} />
                  ))}
                </Accordion>
              </div>
            )}
            <div className="m-3 col-11 col-md-4" ref={list}>
              <h1 className="text-center">Top Pages:</h1>
              <ul className="list-group">
                {sortedlikes.map((page) => (
                  <List
                    key={page.id}
                    name={page.name}
                    fan_count={page.fan_count}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
