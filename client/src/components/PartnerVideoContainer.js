import React, { useEffect, useRef, useState } from 'react';
import "./PartnerVideoContainer.scss"

const PartnerVideoContainer = (props) => {
    const ref = useRef();
    const [show, setShow] = useState(true);
    const [audioTrack, setAudioTrack] = useState();
    const [showAudio, setShowAudio] = useState(false);

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
            alert("on streaming PartnerVideoContainer");
            const audio = stream.getTracks()?.find(track => track.kind === 'audio');
            // alert('audio');
            // alert(JSON.stringify(audio));
            // alert('stream');
            // alert(JSON.stringify(stream));
            // console.log("in useeffect on stream audio");
            // console.log(audio);
            // if (props.partnerAudioUserId === props.partnerID) {
            //     audio.enabled = props.partnerAudioStatus;
            //     setAudioTrack(audio);
            //     setShowAudio(!props.partnerAudioStatus);
            // }
            setAudioTrack(audio);
            setShowAudio(!audio.enabled);
        })

        props.peer.on("connect", () => {
            console.log("Partner peer connected....");
            alert('connect');
        })

        props.peer.on('track', (track, stream) => {
            console.log("on track: ", track);
            console.log("on track stream", stream.getTracks().find(track => track.kind === 'audio'));
            alert('on track');
            // alert(JSON.stringify(track));
            // alert('on track stream');
            // alert(JSON.stringify(stream));
        })

        props.peer.on("close", () => {
            setShow(false);
            ref.current = null;
            props.peer.destroy();
            alert('close');
        });

        props.peer.on('error', (err) => {
            console.error(`${JSON.stringify(err)} at MediaContainer error`);
            console.log("error peer: ", props.peer);
            alert("on error");
            alert(JSON.stringify(err));
        });

        // if (props.partnerAudioUserId === props.partnerID && audioTrack) {
        //     const audio = audioTrack;
        //     audio.enabled = props.partnerAudioStatus;
        //     setAudioTrack(audio);
        //     setShowAudio(!props.partnerAudioStatus);
        // }

    }, [props.peer]);//,props.partnerAudioUserId, props.partnerAudioStatus

    // useEffect(() => {
    //     console.log("props.partnerAudio ID and Status", props.partnerAudioUserId, props.partnerAudioStatus);
    //     if (audioTrack) {
    //         console.log("audioTrack", audioTrack);
    //     }
    // }, [props.partnerAudioUserId, props.partnerAudioStatus])

    const micHandler = () => {
        if (audioTrack?.enabled) {
            // disable mic
            const audio = audioTrack;
            audio.enabled = false;
            setAudioTrack(audio);
            props.onTurnOffAduioSocket(props.partnerID);
            //show enable mic icon
            setShowAudio(true);
        } else {
            // enable mic
            const audio = audioTrack;
            audioTrack.enabled = true;
            setAudioTrack(audio);

            props.onTurnOnAudioSocket(props.partnerID);
            //show disable mic icon
            setShowAudio(false);
        }
    }

    const micOnComponent = (<button type="button" className="btn" onClick={micHandler}>Unmuted</button>);
    const micOffComponent = (<button type="button" className="btn btn-danger" onClick={micHandler}>Muted</button>);

    const partnerVideoVideoComponent = (
        <>
            <video className='video-style' width="400" height="310" playsInline autoPlay ref={ref} controls />
            <div className="card-body">
                <h5 className="card-title h5">Partner ID: </h5>
                <p className="card-text">{props.partnerID}</p>
                <p className="card-text">Audio ID: {audioTrack?.id}</p>
            </div>
            <div className="card-footer d-flex justify-content-center">
                {!showAudio && audioTrack && micOnComponent}
                {showAudio && audioTrack && micOffComponent}
            </div>
        </>)

    return (<>
        {show && partnerVideoVideoComponent}</>
    );
}

export default PartnerVideoContainer;