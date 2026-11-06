import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import championFactions from '../pages/Factions'
import Weapons from '../pages/Weapon'


function Champions()
{

  const [searchChampion, setSearchChampion] =
    useState('');


  const [submittedSearch, setSubmittedSearch] =
    useState('');


  const [champions, setChampions] =
    useState([]);



  useEffect(() =>
  {

    axios
      .get(
        'https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json'
      )
      .then((response) =>
      {

        const championArray =
          Object.values(response.data.data);


        setChampions(championArray);

      })
      .catch((error) =>
      {

        console.log(error);

      });

  }, []);



  /* **************************
     SEARCH ON ENTER
  ************************** */

  const handleSearch = (event) =>
  {

    event.preventDefault();


    setSubmittedSearch(
      searchChampion
    );

  };



  /* **************************
     FILTER CHAMPIONS
  ************************** */

  const filteredChampions =
    champions.filter((champion) =>
    {

      const search =
        submittedSearch
          .toLowerCase()
          .trim();



      /* **************************
         BLANK SEARCH = SHOW ALL
      ************************** */

      if (search === '')
      {
        return true;
      }



      /* **************************
         FIRST LETTER
      ************************** */

      const matchesLetter =
        search.length === 1 &&
        champion.name
          .toLowerCase()
          .startsWith(search);



      /* **************************
         CHAMPION NAME
      ************************** */

      const matchesName =
        search.length > 1 &&
        champion.name
          .toLowerCase()
          .includes(search);



      /* **************************
         ROLE
      ************************** */

      const matchesRole =
        search.length > 1 &&
        champion.tags.some((role) =>

          role
            .toLowerCase()
            .includes(search)

        );



      /* **************************
         RESOURCE
      ************************** */

      const matchesResource =
        search.length > 1 &&
        champion.partype
          .toLowerCase()
          .includes(search);



      /* **************************
         FACTION
      ************************** */

      const matchesFaction =
        search.length > 1 &&
        championFactions[champion.id]
          ?.toLowerCase()
          .includes(search);


      const matchesWeapon =
        search.length > 1 &&
        Weapons[champion.id]
          ?.some((weapon) =>

            weapon
              .toLowerCase()
              .includes(search)

          );



      /* **************************
         CHAMPION INFORMATION
      ************************** */

      const matchesInformation =
        search === `attack ${champion.info.attack}` ||
        search === `defense ${champion.info.defense}` ||
        search === `magic ${champion.info.magic}` ||
        search === `difficulty ${champion.info.difficulty}`;



      return (
        matchesLetter ||
        matchesName ||
        matchesRole ||
        matchesResource ||
        matchesFaction ||
        matchesInformation ||
        matchesWeapon
      );

    });



  return (

    <div className='Core_div'>


      {/* **************************
          MAIN TITLE
      ************************** */}

      <h1 className='Main_h1'>
        League of Legends
      </h1>



      {/* **************************
          SEARCH BAR
      ************************** */}

      <form
        className='Search_form'
        onSubmit={handleSearch}
      >

        <input
          className='Search_Champion'
          type='text'
          placeholder='Search champion...'
          value={searchChampion}
          onChange={(event) =>
            setSearchChampion(
              event.target.value
            )
          }
        />

      </form>



      {/* **************************
          CHAMPION GRID
      ************************** */}

      <div className='Main_div'>

        {
          filteredChampions.map((champion) => (

            <div
              className='Portrait_box'
              key={champion.id}
            >


              <h2 className='Name_div'>
                {champion.name}
              </h2>


              <Link
                to={`/champion/${champion.id}`}
              >

                <img
                  className='Image_icon'
                  src={
                    `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${champion.image.full}`
                  }
                  alt={champion.name}
                  draggable={false}
                  onContextMenu={(event) =>
                    event.preventDefault()
                  }
                />

              </Link>


              <p className='Title_div'>
                {champion.title}
              </p>


            </div>

          ))
        }


      </div>


    </div>

  );

}


export default Champions;