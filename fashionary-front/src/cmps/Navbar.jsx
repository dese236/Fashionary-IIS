import { Component } from 'react'
import { Link } from 'react-router-dom'
// import { ReactComponent as HomepageLogo } from '../assets/img/logos/home-logo.svg'

export default class Navbar extends Component {

    state = {
        isNavBgVisible: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        const { isNavBgVisible } = this.state
        if (window.pageYOffset > 100 && !isNavBgVisible) {
            this.setState({ isNavBgVisible: true })
        } else if (window.pageYOffset < 100 && isNavBgVisible) {
            this.setState({ isNavBgVisible: false })
        }
    }


    render() {
        const { isNavBgVisible } = this.state
        return (
            <header className={`home-header main-container`}>
                <nav className="flex justify-space-between">
                    <div className="logo">
                        {/* <HomepageLogo /> */}
                        Fashionary
                    </div>

                    {/* <div className="nav-btns">
                        <Link to="/ecom" className="login-btn clean-link">
                            התחבר
                        </Link>
                    </div> */}
                </nav>
            </header>
        )
    }
}
