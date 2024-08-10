import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../config/constants";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GridViewIcon from "@mui/icons-material/GridView";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar({ width }: { width?: number }) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={width || 240}
      minWidth={width || 240}
      height={"100%"}
      borderRight={1}
      borderColor={"#ccc"}
    >
      <Box
        p={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img src="/logo.png" alt="" width={100} />
      </Box>
      <Box>
        <List component={"nav"}>
          <ListItem>
            <NavLink to={ROUTES.dashboard} className={"nav-link"}>
              <ListItemButton>
                <ListItemIcon>
                  <GridViewIcon />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={ROUTES.feedbacks} className={"nav-link"}>
              <ListItemButton>
                <ListItemIcon>
                  <GridViewIcon />
                </ListItemIcon>
                <ListItemText>Feedbacks</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={`${ROUTES.feedbackForm}`} className={`nav-link`}>
              <ListItemButton>
                <ListItemIcon>
                  <AutoModeIcon />
                </ListItemIcon>
                <ListItemText>Feedback Form</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={ROUTES.profile} className={"nav-link"}>
              <ListItemButton>
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText>Students</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={`${ROUTES.createStudentForm}`} className={`nav-link`}>
              <ListItemButton>
                <ListItemIcon>
                  <AutoModeIcon />
                </ListItemIcon>
                <ListItemText>Create Student</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={ROUTES.signIn} className={"nav-link"}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Sign Out</ListItemText>
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
