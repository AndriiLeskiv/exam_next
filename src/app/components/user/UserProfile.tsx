import {IUser} from "@/app/models/user/IUser";
import {FC} from "react";
import {IRecipes} from "@/app/models/recipes/IRecipes";

type Props = {
    selectedUser: IUser;
    userRecipes: IRecipes[];
};

const UserProfile: FC<Props> = async ({ selectedUser, userRecipes }) => {
    console.log("selectedUser", selectedUser);

    return (
        <div className="details_result">
            <h2>{selectedUser.firstName} {selectedUser.lastName}</h2>
            <img src={selectedUser.image} alt={selectedUser.firstName} width="100"/>
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.phone}</p>
            <p>Gender: {selectedUser.gender}</p>
            <p>Date of birth: {selectedUser.birthDate}</p>
            <p>University: {selectedUser.university}</p>
            <p>Country: {selectedUser.eyeColor}</p>
            <p>Status: {selectedUser.age}</p>
            <p>Role: {selectedUser.role}</p>
            <p>User IP: {selectedUser.ip}</p>

            <div>
                {userRecipes && userRecipes.length > 0 ? (
                    <>
                        <h3>User recipes:</h3>
                        <ul>
                            {userRecipes.map((recipe) => (
                                <li key={recipe.id}>
                                    <a href={`/recipes/${recipe.id}`}>{recipe.name}</a>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;