import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import axios from "axios";
import "./css/Form.css";
import urls from "../urls.json";

const server = urls.SERVER_URL;

const EventManagementPage = () => {
  const auth = localStorage.getItem("login");
  const user = decodeToken(auth);
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    user: user.email,
    file: null,
    event: "",
    cdc: false,
  });

  if (!auth) {
    alert("unauthorized user");
    window.location.href("/");
  }
  const [selectedFile, setSelectedFile] = useState(null);
  const [partners, setPartners] = useState([]);
  const [selectedPartners, setSelectedPartners] = useState({});
  const [dispatch, setDispatch] = useState("CDC");
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    if (!auth || !user) {
      window.location.href = "/";
    }
    const get_orgs = async () => {
      try {
        const response = await axios.post(
          `${server}/api/get_all_org`,
          { token: auth },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        setPartners(response.data.message);
      } catch (error) {
        alert(error.response.data.message);
        window.location.reload();
      }
    };
    get_orgs();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    if (e.target.name === "cdc") {
      setEventData({ ...eventData, cdc: !eventData.cdc });
    } else {
      setEventData({ ...eventData, [e.target.name]: e.target.value });
    }
  };

  const handlePartners = (e) => {
    const tmp = { ...selectedPartners };
    tmp[e.target.value] = e.target.checked;
    setSelectedPartners(tmp);
  };

  const handleDispatch = (e) => {
    setDispatch(e.target.value);
  };

  const [certi, setFile] = useState();
  const imageRef = useRef(null);
  const rectRef = useRef(null);

  const upload = async () => {
    if (eventData.event !== "" && selectedFile !== null) {
      eventData.file = selectedFile;

      const tmpBody = { partners: selectedPartners, token: auth };
      try {
        const response = await axios.post(
          `${server}/api/get_faculties`,
          tmpBody,
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        navigate("/certificate", {
          state: {
            eventData: eventData,
            faculties: response.data.message,
            dispatch: dispatch,
          },
        });
      } catch (error) {
        alert(error.response.data.message);
        window.location.href = "/event_management";
      }
    } else {
      alert("Please fill all the data");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ flexGrow: "1", overflowY: "auto" }}>
        <form>
          <div className="form-container">
            <div
              className="form-internal"
              style={{ textAlign: "center", margin: "10%" }}
            >
              <h1 className="title">Event Management</h1>

              <input
                className="input_text"
                placeholder="Event Name:"
                type="text"
                id="event_name"
                name="event"
                value={eventData.event}
                onChange={handleChange}
                required
              />
              <p />

              <input
                className="input_text"
                placeholder="Participants"
                type="file"
                id="participants"
                onChange={handleFileChange}
                required
              />
              <p />
              <div className="input_class">
                <input
                  type="checkbox"
                  style={{
                    display: "inline-block",
                    verticalAlign: "top",
                    width: "14px",
                    height: "14px",
                  }}
                  name="cdc"
                  checked={eventData.cdc}
                  onChange={handleChange}
                />{" "}
                CDC/DSW Signature Required?
                <p />
              </div>

              <label for="dispatch">Dispatched by:</label>
              <div className="input_class">
                <input
                  type="radio"
                  name="dispatch"
                  value="CDC"
                  onChange={handleDispatch}
                />{" "}
                CDC
              </div>
              <div className="input_class">
                <input
                  type="radio"
                  name="dispatch"
                  value="DSW"
                  onChange={handleDispatch}
                />{" "}
                DSW
              </div>

              <label for="partners">Partner Organisation:</label>
              {partners.map((partner) => (
                <>
                  <div className="input_class">
                    <input
                      type="checkbox"
                      value={partner}
                      onChange={handlePartners}
                    />{" "}
                    {partner}
                  </div>
                </>
              ))}
              {/* <label htmlFor="cdcHead">CDC Head:</label>
        <input type="text" id="cdcHead" name="cdcHead" value={eventData.cdcHead} onChange={handleChange} required /> */}
              <button className="submit-btn" type="button" onClick={upload}>
                Upload Certificate
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventManagementPage;
