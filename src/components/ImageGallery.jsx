import React, { Component } from "react";
import "../styles/index.css";

class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 1, // Initial slide index is 1
    };
  }

  // Function to go to the next/previous slide
  plusSlides = (n) => {
    this.setState((prevState) => {
      let newSlideIndex = prevState.slideIndex + n;
      // Ensure that the slide index wraps around correctly
      if (newSlideIndex > this.props.images.length) newSlideIndex = 1;
      if (newSlideIndex < 1) newSlideIndex = this.props.images.length;
      return { slideIndex: newSlideIndex };
    });
  };

  // Function to set the current slide based on user click
  currentSlide = (n) => {
    this.setState({ slideIndex: n });
  };

  // Function to display the correct slide and update captions and active dots
  showSlides = (n) => {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("demo");
    const captionText = document.getElementById("caption");

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    // Remove the "active" class from all dots
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the current slide
    slides[n - 1].style.display = "block";
    dots[n - 1].className += " active";
    captionText.innerHTML = dots[n - 1].alt; // Set the caption text
  };

  // This is called after the component updates to make sure the slides are displayed correctly
  componentDidUpdate(prevProps, prevState) {
    if (prevState.slideIndex !== this.state.slideIndex) {
      this.showSlides(this.state.slideIndex); // Show the newly selected slide
    }
  }

  // This lifecycle method runs once the component has mounted
  componentDidMount() {
    // Initially show the first slide
    this.showSlides(this.state.slideIndex);
  }

  render() {
    const { images } = this.props; // Get images from props
    const totalImages = images.length;

    return (
      <div className="container">
        {/* Display all slides */}
        {images.map((image, index) => (
          <div className="mySlides" key={image.id}>
            <div className="numbertext">
              {index + 1} / {totalImages}
            </div>
            <img src={image.path} alt={image.name} style={{ width: "100%" }} />
          </div>
        ))}

        {/* Previous and Next buttons */}
        <a className="prev" onClick={() => this.plusSlides(-1)}>
          ❮
        </a>
        <a className="next" onClick={() => this.plusSlides(1)}>
          ❯
        </a>

        {/* Caption container */}
        <div className="caption-container">
          <p id="caption"></p>
        </div>

        {/* Thumbnail row */}
        <div className="row">
          {images.map((image, index) => (
            <div className="column" key={image.id}>
              <img
                className="demo cursor"
                src={image.path}
                alt={image.name}
                style={{ width: "100%" }}
                onClick={() => this.currentSlide(index + 1)} // 1-based index for the slides
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ImageGallery;
