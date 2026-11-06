import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'


function ChampionDetails()
{

  const { id } =
    useParams();


  const [champion, setChampion] =
    useState(null);


  const [error, setError] =
    useState(null);


  const [selectedAbility, setSelectedAbility] =
    useState(null);



  useEffect(() =>
  {

    setChampion(null);
    setError(null);
    setSelectedAbility(null);


    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion/${id}.json`
      )
      .then((response) =>
      {

        setChampion(
          response.data.data[id]
        );

      })
      .catch((error) =>
      {

        console.log(error);


        setError(
          'Could not load champion information.'
        );

      });

  }, [id]);



  /* **************************
     ABILITY KEYS
  ************************** */

  const abilityKeys =
    ['Q', 'W', 'E', 'R'];



  /* **************************
     ERROR
  ************************** */

  if (error)
  {

    return (

      <div className='Champion_details'>

        <Link to="/">
          Back to Champions
        </Link>


        <h2>
          {error}
        </h2>

      </div>

    );

  }



  /* **************************
     LOADING
  ************************** */

  if (!champion)
  {

    return (

      <h2 className='Loading_text'>
        Loading...
      </h2>

    );

  }



  return (

    <div className='Champion_details'>


      {/* **************************
          CHAMPION HEADER
      ************************** */}

      <div className='Champion_header'>


        <div className='Champion_headerline'>


          <Link to="/">

            <img
              className='Champion_details_image'
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



          <div className='Champion_header_information'>


            {/* Champion Name */}

            <h1 className='Champion_name'>
              {champion.name}
            </h1>


            {/* Champion Title */}

            <h2 className='Champion_title'>
              {champion.title}
            </h2>


          </div>



          {/* Role */}

          <div className='Role'>

            <p className='Role_'>
              Role:
            </p>

            <p className='Role_text'>
              {champion.tags.join(', ')}
            </p>

          </div>



          {/* Resource */}

          <div className='Resource'>

            <p className='Resource_'>
              Resource:
            </p>

            <p className='Resource_text'>
              {champion.partype}
            </p>

          </div>


        </div>


      </div>



      {/* **************************
          CHAMPION INFORMATION
      ************************** */}

      <div className='Collective_setup'>


          {/* **************************
              STATS
          ************************** */}
        
          <div className='Champion_stats'>


            <h2>
              Stats
            </h2>



            {/* Health */}

            <div className='Health'>

              <p className='Health_'>
                Health:
              </p>

              <p className='Health_text'>
                {champion.stats.hp}
              </p>

            </div>



            {/* Mana / Resource */}

            <div className='Resource'>

              <p className='Resource_'>
                Mana / Resource:
              </p>

              <p className='Resource_text'>
                {champion.stats.mp}
              </p>

            </div>



            {/* Attack Damage */}

            <div className='Damage'>

              <p className='Damage_'>
                Attack Damage:
              </p>

              <p className='Damage_text'>
                {champion.stats.attackdamage}
              </p>

            </div>



            {/* Attack Speed */}

            <div className='Speed'>

              <p className='Speed_'>
                Attack Speed:
              </p>

              <p className='Speed_text'>
                {champion.stats.attackspeed}
              </p>

            </div>



            {/* Armor */}

            <div className='Armor'>

              <p className='Armor_'>
                Armor:
              </p>

              <p className='Armor_text'>
                {champion.stats.armor}
              </p>

            </div>



            {/* Movement Speed */}

            <div className='Movement'>

              <p className='Movement_'>
                Movement Speed:
              </p>

              <p className='Movement_text'>
                {champion.stats.movespeed}
              </p>

            </div>



            {/* Attack Range */}

            <div className='Range'>

              <p className='Range_'>
                Attack Range:
              </p>

              <p className='Range_text'>
                {champion.stats.attackrange}
              </p>

            </div>


          </div>

           <div className='Champion_information'>

          <h2>
            Champion Information
          </h2>



          {/* Difficulty */}

          <div className='Difficulty'>

            <p className='Difficulty_'>
              Difficulty:
            </p>

            <p className='Difficulty_text'>
              {champion.info.difficulty}
            </p>

          </div>



          {/* Attack */}

          <div className='Attack'>

            <p className='Attack_'>
              Attack:
            </p>

            <p className='Attack_text'>
              {champion.info.attack}
            </p>

          </div>



          {/* Defense */}

          <div className='Defense'>

            <p className='Defense_'>
              Defense:
            </p>

            <p className='Defense_text'>
              {champion.info.defense}
            </p>

          </div>



          {/* Magic */}

          <div className='Magic'>

            <p className='Magic_'>
              Magic:
            </p>

            <p className='Magic_text'>
              {champion.info.magic}
            </p>

          </div>


        </div>


      </div>

      {/* **************************
          PASSIVE
      ************************** */}

      <section className='Champion_passive'>


        <h2>
          Passive
        </h2>


        <img
          className='Ability_image'
          src={
            `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/passive/${champion.passive.image.full}`
          }
          alt={champion.passive.name}
          draggable={false}
          
        />

        <h3>
          {champion.passive.name}
        </h3>


          <p className='Passive_description'>
            {
              champion.passive.description
                .split(/<br\s*\/?>|(?<=\.)/gi)
                .map((line, lineIndex) => (

                  <span key={lineIndex}>

                    {line.trim()}

                    <br />

                  </span>

                ))
            }
          </p>


      </section>



      {/* **************************
          ABILITIES
      ************************** */}

      <div className='Champion_abilities'>


        <h2 className='Abilities_title'>
          Abilities:
        </h2>


        {
          champion.spells.map((spell, index) => (

            <section
              className={`Ability_section Ability_${abilityKeys[index]}`}
              key={spell.id}
            >


              <h2
                className={`Ability_title Ability_title_${abilityKeys[index]}`}
              >
                {abilityKeys[index]} - {spell.name}
              </h2>


              <img
                className={`Ability_image Ability_image_${abilityKeys[index]}`}
                src={
                  `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${spell.image.full}`
                }
                alt={spell.name}
                draggable={false}
                onClick={() =>
                  setSelectedAbility(spell)
                }
              />
              
            <p className='Passive_description'>
              
              {champion.passive.description
                  .split(/<br\s*\/?>|(?<=\.)/gi)
                  .map((line, lineIndex) => (

                    <span key={lineIndex}>

                      {
                        line
                          .replace(/<[^>]*>/g, '')
                          .trim()
                      }

                      <br />

                    </span>

                  ))
              }
            </p>


              <p>
                Cooldown: {spell.cooldownBurn}
              </p>


              <p>
                Cost: {spell.costBurn}
              </p>


              <p>
                Range: {spell.rangeBurn}
              </p>


            </section>

          ))
        }


      </div>

    </div>

  );

}


export default ChampionDetails;