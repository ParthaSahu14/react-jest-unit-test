import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, UserAttribute } from "../model/Model";
import { AuthService } from "../services/AuthService";

// interface ProfileState {
//     userAttributes: UserAttribute[];
// }

interface ProfileProps {
    user: User | undefined;
    authService: AuthService;
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
    const [userAttributes, setUserAttributes] = useState<UserAttribute[]>([]);
    const getUserAttrbutes = useCallback( async () => {
        if (props.user) {
            const userAttrs = await props.authService.getUserAttributes(props.user);
            setUserAttributes(userAttrs);
        }
      }, [props.user, props.authService]);

    useEffect(() => {
        getUserAttrbutes();
    }, [getUserAttrbutes]);

    

    const renderUserAttributes = () => {
        const rows = [];
        for (const userAttr of userAttributes) {
            rows.push(<tr key={userAttr.Name}>
                <td>{userAttr.Name}</td>
                <td>{userAttr.value}</td>
            </tr>)
        }

        return <table>
            <tbody>
                {rows}
            </tbody>
        </table>
    }

    const ProfileSpace = () => {
        if (props.user) {
            return (
                <div>
                    <h3>Hello , {props.user.userName}</h3>
                    <h5>Here are your attributes</h5>
                    {userAttributes ?
                        renderUserAttributes()
                        : 'Loading attributes'}
                </div>
            );
        } else {
            return <div>
                Please <Link to='/login'>Login</Link>
            </div>;
        }
    }

    return (
        <div>Welcome to the profile page
            {ProfileSpace()}
        </div>
    );
}

export { Profile };