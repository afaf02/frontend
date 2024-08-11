import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../config/constants";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GridViewIcon from "@mui/icons-material/GridView";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { logout } from "../../features/auth/authSlice";

export default function Navbar({ width }: { width?: number }) {
  const { userType } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
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
        <Typography variant="h3" color={"#6BB955"} textAlign={"center"}>
          SMIT
        </Typography>
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
          {userType === "Admin" && (
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
          )}
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
          {userType === "Admin" && (
            <ListItem>
              <NavLink to={ROUTES.users} className={"nav-link"}>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonOutlineIcon />
                  </ListItemIcon>
                  <ListItemText>Students</ListItemText>
                </ListItemButton>
              </NavLink>
            </ListItem>
          )}
          <ListItem>
            <NavLink
              to={ROUTES.signIn}
              className={"nav-link"}
              onClick={() => dispatch(logout())}
            >
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
