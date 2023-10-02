import { Link } from "react-router-dom";
const ContactView = () => {

    return (
        <div>
            <h2>
                Contact Me
            </h2>
            <p>
                Questions, Comments, Suggestions? 
                <br />
                <br />
                You can reach me at <Link to='mailto:cedric.green@ndus.edu'>cedric.green@ndus.edu</Link>
            </p>
        </div>
    );
}

export default ContactView;