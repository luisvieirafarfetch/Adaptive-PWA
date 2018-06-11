import React from 'react';
import { Link } from 'react-router-dom';
import StylesCommon from './nav.common.css';
import Styles from './nav.css';
import { set, get } from 'idb-keyval';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saveData: false,
        };
    }

    async componentDidMount() {
        await get('Save-Data').then(val =>
            this.setState({
                saveData: val,
            })
        );
    }

    render() {
        return (
            <div>
                <ul className={[StylesCommon.nav, Styles.nav].join(' ')}>
                    <li className={StylesCommon.link}>
                        <h1 className={Styles.title}>HN</h1>
                    </li>
                    <li className={Styles.link}>
                        <Link to="/">Top</Link>
                    </li>
                    <li className={Styles.link}>
                        <Link to="/new">New</Link>
                    </li>
                    <li className={Styles.link}>
                        <Link to="/preferences">Preferences</Link>
                    </li>
                </ul>
                {this.props.children}
                <footer className={Styles.footer} />
            </div>
        );
    }
}

export default Nav;
