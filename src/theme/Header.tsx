import { Account } from "@cosmwasm/sdk";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import MuiTypography from "@material-ui/core/Typography";
import { ArrowBack } from "@material-ui/icons";
import * as React from "react";
import { Link } from "react-router-dom";

function ElevationScroll(props: any) {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    //   target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

export interface HeaderProps {
    readonly account?: Account;
    children?: React.ReactElement;
}


function renderBalance({ balance }: Account): string {
    return balance.map(({amount, denom}) => `${amount} ${denom}`).join(", ") || '(Empty Account)';
}



// Show the current account or any error message in the header
export function Header({account, children}: HeaderProps, props: any): JSX.Element {
    const balance = account ? renderBalance(account) : "(Loading Balance)";
    const address = account ? account.address : "(No Address)";

    return (
        <React.Fragment>
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Link to="/">
                            <IconButton edge="start" color="inherit">
                                <ArrowBack />
                            </IconButton>
                        </Link>
                        <MuiTypography variant="h6">{address} - {balance}</MuiTypography>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </React.Fragment>
    );
}
