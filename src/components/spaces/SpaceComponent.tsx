import React from "react";
import defaultImage from '../../assets/default.jpg';
import './SpaceComponent.css';

interface SpaceComponentProps{
    spaceId: string;
    name: string;
    location: string;
    photoUrl?: string;
    reserveSpace: (spaceId: string) => void;
}

const SpaceComponent: React.FC<SpaceComponentProps> = (props: SpaceComponentProps) => {

    const renderImage = () => {
        if(props.photoUrl){
            return <img src={props.photoUrl} alt=''/>
        }else{
            return <img src={defaultImage} alt=''/>
        }
    }
    
    return (
        <div className="spaceComponent">
            {renderImage()}
            <label className="name">{props.name}</label><br />
            <label className="spaceId">{props.spaceId}</label><br />
            <label className="location">{props.location}</label><br />
            <button onClick={() => props.reserveSpace(props.spaceId)}>Reserve</button>
        </div>
    );
}

export {SpaceComponent};