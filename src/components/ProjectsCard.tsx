import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import styled from "styled-components";
import { colors } from "../color";
import { IProject } from "./GridItems/GridItems";
import skillIcons from "../assets/skills/index";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useNavigate } from "react-router-dom";
dayjs.extend(duration);
function ProjectsCard({ project }: { project: IProject }) {
  const navigate = useNavigate();
  const skillIconsNames = skillIcons.map(
    (str) => str.split("icons8-")[1].split(".")[0]
  );
  console.log(skillIcons, skillIconsNames);

  let today = dayjs(project.startData);
  let expired_at = dayjs(project.endDate);
  let result = expired_at.diff(today, "day", true);
  let d_day = Math.floor(result);
  const [month, date] = dayjs.duration(d_day, "days").format("M-D").split("-");
  console.log(month, date);

  return (
    <Card className="card">
      <div className="thumbnail">
        <img className="left" src={project.thumbImageUri} />
      </div>
      <div className="right">
        <h1>{project.title}</h1>
        <div className="separator"></div>
        <p>{project.overview}</p>
      </div>
      <div className="start-date">
        <h5>{dayjs(project.startData).format("DD")}</h5>
        <h6>
          {dayjs(project.startData).format("MMMM")} <span>부터~</span>
          {+month > 0 && month + "개월"} {date + "일"} <span> 동안</span>
        </h6>
      </div>

      <div className="skills">
        <div className="separator"></div>
        <ul>
          {project.skills.map((str) => {
            const temp = skillIconsNames
              .map((iconName, i) => iconName == str)
              .indexOf(true);
            if (temp > 0) {
              return (
                <li>
                  <img src={skillIcons[temp]} />
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className="fab" onClick={() => navigate(`/projects/${project.id}`)}>
        <AiOutlineArrowRight
          color="#fff"
          size={"2rem"}
          style={{
            minWidth: "2rem",
            minHeight: "2rem",
          }}
        />
      </div>
    </Card>
  );
}

export default ProjectsCard;

const Card = styled.div`
  font-family: "NEXON";
  /* The card */
  position: relative;
  height: 460px;
  width: 80vw;
  max-width: 1100px;
  margin: 300px auto;
  background-color: ${colors.lightBlack};
  box-shadow: 10px 10px 93px 0px rgba(5, 253, 216, 0.2);

  .skills {
    margin: 1rem 20px 0 60%;
    h4 {
      font-size: 1.5rem;
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
      border-bottom: 2px solid ${colors.fluor};
      font-family: "BM-Air";
      color: ${colors.gray};
    }
    ul {
      margin-top: 10px;
      display: flex;
      gap: 1rem;
    }

    li {
      color: #7b7b7b;
      width: 2.5rem;
      height: 2.5rem;
      background: ${colors.gray};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      img {
        width: 2rem;
        height: 2rem;
      }
    }
  }

  /* Image on the left side */
  .thumbnail {
    float: left;
    position: relative;
    left: 30px;
    top: -27%;
    width: 60%;
    aspect-ratio: 5/3;
    -webkit-box-shadow: 10px 10px 60px 0px rgba(5, 253, 216, 0.2);
    -moz-box-shadow: 10px 10px 60px 0px rgba(5, 253, 216, 0.2);
    box-shadow: 10px 10px 60px 0px rgba(5, 253, 216, 0.2);
    overflow: hidden;
  }

  /*object-fit: cover;*/
  /*object-position: center;*/
  img.left {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  /* Right side of the card */
  .right {
    margin-left: 70%;
    margin-right: 20px;
    p {
      height: 210px;
      overflow: hidden;
      color: ${colors.lightGray};
    }
  }

  h1 {
    word-break: keep-all;
    padding: 15px 0;
    font-size: 2rem;
    font-family: "BM-Pro";
    color: ${colors.fluor};
    height: 130px;
    display: flex;
    align-items: center;
  }

  .author > img {
    padding-top: 5px;
    margin-left: 10px;
    float: left;
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }

  h2 {
    padding-top: 8px;
    margin-right: 6px;
    text-align: right;
    font-size: 0.8rem;
  }
  .separator {
    margin-top: 10px;
    border: 1px solid ${colors.fluor};
  }

  p {
    text-align: start;
    padding-top: 10px;
    font-size: 0.95rem;
    line-height: 150%;
    color: #4b4b4b;

    white-space: break-spaces;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  /* DATE of release*/
  .end-date,
  .start-date {
    position: absolute;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .end-date {
    left: 290px;
  }
  .start-date {
    left: 30px;
    h5 {
      font-size: 6rem;
      color: ${colors.lightGray};
      display: block;
      font-weight: bold;
    }
  }
  h6 {
    text-transform: uppercase;
    font-size: 2rem;
    color: ${colors.lightGray};
    display: block;
    font-weight: bold;
    span {
      color: ${colors.darkGray};
      opacity: 0.7;
      font-size: 1rem;
      margin-right: 1rem;
    }
  }

  /* Floating action button */
  .fab {
    position: absolute;
    right: 50px;
    bottom: -40px;
    box-sizing: border-box;
    background-color: #00caa5;
    width: 80px;
    height: 80px;
    color: white;
    text-align: center;
    border-radius: 50%;
    -webkit-box-shadow: 10px 10px 50px 0px rgba(5, 253, 216, 0.2);
    -moz-box-shadow: 10px 10px 50px 0px rgba(5, 253, 216, 0.2);
    box-shadow: 10px 10px 50px 0px rgba(5, 253, 216, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    cursor: pointer;
    :hover {
      scale: 1.1;
    }
  }
`;
