import { IoLogoGithub, IoLogoInstagram } from "react-icons/io";
import { colors } from "../../../color";
import { SlimText, SnsLink } from "./ContactMe.styles";
import velog from "../../../assets/logo/velog.ico";

function MetaData() {
  return (
    <>
      <SlimText>부천시 장말로 136</SlimText>
      <SlimText>hi6724@gmail.com | +8210-4362-6724</SlimText>
      <div style={{ display: "flex", gap: 15 }}>
        <SnsLink href={"https://github.com/hi6724"} target="_blank">
          <IoLogoGithub size={"2rem"} color={colors.link} />
        </SnsLink>
        <SnsLink href={"https://velog.io/@hunmok1027"} target="_blank">
          <img
            src={velog}
            alt=""
            style={{ width: "2rem", padding: "0.1rem" }}
          />
        </SnsLink>
        <SnsLink href={"https://www.instagram.com/ha_hunmok/"} target="_blank">
          <IoLogoInstagram size={"2rem"} color={colors.pink} />
        </SnsLink>
      </div>
    </>
  );
}

export default MetaData;
