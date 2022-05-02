import React, { useCallback, useEffect, useState } from "react";
import { Space } from "../../model/Model";
import { DataService } from "../../services/DataService";
import { SpaceComponent } from "./SpaceComponent";
import { ConfirmModal } from "./ConfirmModal";

interface SpaceState{
    spaces?: Space[];
    showModal?: boolean;
    modalContent?: string;
}

interface SpaceProps {
    dataService: DataService;
}

const Spaces: React.FC<SpaceProps> = (props: SpaceProps) => {

    const [spaces, setSpaces] = useState<SpaceState>({
        spaces: [],
        modalContent: '',
        showModal: false
    });
    const getSpaces = useCallback( async () => {
        const result = await props.dataService.getSpaces();
            setSpaces({spaces: result});
            console.log(result);
      }, [props.dataService]);

    useEffect(() => {
        getSpaces();
    }, [getSpaces])


    const reserveSpace = async (spaceId: string) => {
        const result = await props.dataService.reserveSpace(spaceId);
        if(result){
            setSpaces(prevSpaces => {
                return { 
                  ...prevSpaces, 
                  showModal: true,
                  modalContent: `You reserved the space with Id ${spaceId} and got the reservation number ${result}`
                }
              });
        }else{
            setSpaces(prevSpaces => {
                return { 
                  ...prevSpaces, 
                  showModal: true,
                  modalContent: `You  can not reserve the space with Id ${spaceId}`
                }
              });
        }
    }

    const renderSpaces = () => {
        const rows: any[] = [];
        if(spaces.spaces){
            for (const space of spaces.spaces) {
                rows.push(
                    <SpaceComponent
                        key={space.spaceId}
                        location={space.location}
                        name={space.name}
                        spaceId={space.spaceId}
                        reserveSpace={reserveSpace}
                    />
                )
            }
        }
        return rows;
    }

    const closeModal = () => {
        setSpaces(prevSpaces => {
            return { 
              ...prevSpaces, 
              showModal: false,
              modalContent:''
            }
          })
    }

    return (
        <div>
            <h2>Welcome to Space page</h2>
            {renderSpaces()}
            <ConfirmModal 
                close={closeModal}
                content={spaces.modalContent || ''}
                show={spaces.showModal || false}/>
        </div>
    );
}


export { Spaces }