import React, { useEffect,useState} from 'react'
import SENDER from '../../utils/SENDER';
import Modal from "react-bootstrap/Modal";

const NoticeViewer = props => {
    const [content,setContent] = useState("")
    const [title,setTitle] = useState("")
    const [show, setShow] = useState(true);
    const [p, setP] = useState(true);

    useEffect(
        () => {
            if (props.id && p) {
                setShow(true);
              } else {
                setShow(false);
                if (!p) {
                  window.location.reload();
                }
              }

            if(props.id !== null){
                SENDER.get('/notices/'+props.id).then(
                    res => {
                        setContent(res.data.content)
                        setTitle(res.data.title)
                    }
                ).catch(err => console.log(err))
            }
        }
    )
    return(
        <Modal
        size="sm"
        show={show}
        onHide={() => setP(false)}
        backdrop="static"
        dialogClassName="task_viewer_modal"
        //aria-labelledby="contained-modal-title-vcenter"
        //centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "calc(100vh - 190px)",
            height: "50vh",
            overflowY: "auto",
          }}
        >   
            <div>
                    <div style={{textAlign: "justify"}}dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
        </Modal.Body>
        </Modal>
    )
}

export default NoticeViewer