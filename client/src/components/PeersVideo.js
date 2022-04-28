import React from 'react';
import PartnerVideoContainer from './PartnerVideoContainer';

const PeersVideo = ({ partnerAudioUserId, showPartnerVideo, peers }) => {
    //, partnerAudioStatus, onTurnOffAduioSocket, onTurnOnAudioSocket, onSendStreamToPartner
    //&& partnerAudioUserId !== ''
    return (<>{
        showPartnerVideo && peers.length > 0
        && peers.map((peer, index) => {
            return (
                <PartnerVideoContainer
                    key={index}
                    peer={peer.peer}
                    partnerID={peer.partnerID}
                // partnerAudioUserId={partnerAudioUserId}
                // partnerAudioStatus={partnerAudioStatus}
                // onSendStreamToPartner={onSendStreamToPartner}
                // onTurnOffAduioSocket={onTurnOffAduioSocket}
                // onTurnOnAudioSocket={onTurnOnAudioSocket}
                />
            );
        })
    }</>);
}

export default PeersVideo;