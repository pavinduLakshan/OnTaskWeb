import React,{ useState,useRef,useEffect} from 'react'
import './styles.css'
import { Camera } from "styled-icons/boxicons-solid/Camera";
import SENDER from "../../utils/SENDER";

const ProfilePicture = props => {
    const uploader = useRef(null);
  const [on, setOn] = useState(true);
  const [propic, setPropic] = useState(null);
  const showOv = () => {
    setOn(!on);
  };

    function fileChangedHandler(event) {
        console.log(event.target.files[0]);
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("name", event.target.files[0].name.replace(/(|)/g,"_"));
    
        SENDER.post(
          "/user/" + localStorage.getItem("id") + "/change-propic",
          formData
        )
          .then(res => {
            if (res.status === 200) {
              //alert("Propic suc");
              setOn(!on)
            }
          })
          .catch(err => alert("err"));
      }

      const showOpenFileDlg = () => {
        uploader.current.click();
      };
      
    useEffect(() => {
        SENDER.get("/user/" + props.id + "/pro-pic").then(
          res => {
            console.log(res.data);
            setPropic(res.data);
          }
        );
      });


    return (
        <div className="pro_pic_container" >
        <div        
          style={{ borderRadius: "50%" }}>
        {
          propic ? <img
          src={propic}
          onMouseEnter={showOv}
          className="pro_pic"
          alt=""
          style={{ borderRadius: "10px",height: "40vh",width: "100%"}}
        />:<i className="fa fa-user" style={{marginLeft: "9%",fontSize: "220px"}}></i>
        }
        </div>
        <div className="pro_pic_update_btn" style={{display: localStorage.getItem('id') === props.id ? "block" : "none"}}>
          <input
            ref={uploader}
            onChange={fileChangedHandler}
            accept="image/*"
            type="file"
            style={{ display: "none" }}
          />
          <Camera
            size="30"
            onClick={showOpenFileDlg}
            style={{color: "white"}}
            title="update profile photo"
          />
        </div>
      </div>
    )
}

export default ProfilePicture