//import "../../App.css";

import { useState } from "react";


export function TwitterFollowCard({userName, name}) {
 
const text = isFollowing ? 'Siguiendo' : 'Seguir'  
const buttonClassName = isFollowing ? 'tw-followCard-button is-following ' : 'tw-followCard-button'

//valor por defecto
//funcion para cambiarlo

const [isFollowing, setIsFollowing] = useState(false)


  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          className="tw-followCard-avatar"
          alt="El avatar de midudev"
          src={`https://unavatar.io/${userName}`}
        ></img>
      </header>
      <div className="tw-followCard-info">
        <strong>{name}</strong>
        <span className="tw-followCard-infoUserName">@{userName}</span>
      </div>

      <aside>
        <button className={buttonClassName}>{text}</button>
      </aside>
    </article>
  );
}
