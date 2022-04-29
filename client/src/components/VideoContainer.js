import React, { useEffect, useRef, useState } from 'react';
const VideoConatiner = (props) => {
    const userVideo = useRef();
    const [showAudio, setShowAudio] = useState(false);
    const audioTrack = props.stream?.getTracks()?.find(track => track.kind === 'audio');

    useEffect(() => {
        if (props.stream) {
            if (userVideo.current) {
                userVideo.current.srcObject = props.stream;
            }
        }

        // audioTrack.enabled = props.yourAudioStatus;

        if (audioTrack.enabled) {
            setShowAudio(false);
        } else {
            setShowAudio(true);
        }

    }, [props.stream]);//, props.yourAudioStatus

    useEffect(() => {
        console.log("props.yourAudioStatus", props.yourAudioStatus);
        if (audioTrack) {
            console.log("audioTrack", audioTrack);
            audioTrack.enabled = props.yourAudioStatus;
        }
        setShowAudio(!props.yourAudioStatus);
    }, [props.yourAudioStatus])

    const micHandler = () => {
        if (audioTrack.enabled) {
            // disable mic
            audioTrack.enabled = false;
            props.onTurnOffAduioSocket(props.yourID, false);
            //show enable mic icon
            setShowAudio(true);

        } else {
            // enable mic
            audioTrack.enabled = true;
            props.onTurnOnAudioSocket(props.yourID, true);
            //show disable mic icon
            setShowAudio(false);
        }
    }

    const micOnComponent = (<button type="button" className="btn" onClick={micHandler}>Unmute</button>);
    const micOffComponent = (<button type="button" className="btn btn-danger" onClick={micHandler}>Mute</button>);

    return (
        <div className="col col-md">
            <div className="card mt-3">
                <video className='video-style' width="400" height="310" playsInline muted ref={userVideo} autoPlay controls />
                <div className="card-body">
                    <h5 className="card-title h5">Your ID: </h5>
                    <p className="card-text">{props.yourID}</p>
                    <p className="card-text">Audio ID: {audioTrack.id}</p>
                </div>
                <div className="card-footer d-flex justify-content-center">
                    {!showAudio && micOnComponent}
                    {showAudio && micOffComponent}
                </div>
            </div>
        </div>
    )
}

export default VideoConatiner;