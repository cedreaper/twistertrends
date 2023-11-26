const AboutView = () => {

    return (
        <div>
            <h2>About</h2>
            <p>
                <h3>This project was born from two events</h3>
                <hr />
                <ul>
                    <li>Being a resident of the state of Oklahoma and growing up around the natural phenomena
                        known as Tornados.</li>
                    <br />
                    <li>My graduate school database course at North Dakota State University challenging us to come up with
                        an original project that we're genuinely interested in that incorporates elements drawn from 
                        what we've learned throughout the course.
                    </li>
                </ul>

                The resulting project was both challenging and rewarding. I'd like to give a special thanks to Dr. Denton
                for the initial topic feedback which started the process into this journey.
                <br />
                <hr />
                Now for the concrete details...
                <br />
                <br />
                The main focus of this web application is to research the area of annual climate change based on data from the NOAA and historical tornadic
                data from the National Weather Service in an attempt to locate a correlation between the two events trends.
                <br />
                <br />
                The bulk data will processed using ETL principles to ensure relevancy and eliminate waste.
            </p>
        </div>   
    );
}

export default AboutView;