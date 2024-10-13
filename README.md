# Night Movie

"Night Movie" is a streaming application designed for movie enthusiasts, allowing users to explore a vast collection of movies and series. This application provides a rich user experience with features that make discovering new content easy and enjoyable.

## Demo

![Screenshot Night Movie](https://i.ibb.co.com/zFjG6Xm/night-movie-demo.png)
Visit the live application here: [Live Demo](https://night-movie-ten.vercel.app)

## Features

- **Extensive Movie & Series Database**: Browse through a wide range of movies and TV shows.
- **Detailed Information**: Get in-depth details about each movie or series, including descriptions, ratings, and release dates.
- **Search Functionality**: Easily find your favorite films or shows with a powerful search feature.
- **Discovery Options**: Discover new content based on various filters, such as genre, popularity, and release date.
- **User-Friendly Interface**: Navigate the application effortlessly with an intuitive design.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that enhances the development experience.
- **TMDB API**: The Movie Database API for accessing movie and series data.
- **Tailwind CSS**: A utility-first CSS framework for designing responsive layouts.
- **React Router**: A library for routing in React applications, enabling dynamic navigation.
- **React Query**: A library for fetching, caching, and updating asynchronous data in React applications.

## Getting Started

### Prerequisites

- **Bun**: Ensure you have Bun installed to manage dependencies. Follow the instructions [here](https://bun.sh/docs/installation).
- **TMDB API Key**: Register at [TMDB](https://www.themoviedb.org/) to obtain your API key. Once registered, navigate to your account settings and find the API section to generate your key.
- **Node.js**: While Bun is an alternative, it may still be useful to have Node.js installed on your system (version 12 or newer).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/night-movie.git

   ```

2. Navigate to the project directory:

   ```bash
   cd night-movie

   ```

3. Install dependencies using Bun:

   ```bash
   bun install

   ```

4. Set up your TMDB API key:

   - Create a `.env` file in the root directory.
   - Add your API key in the following format:
     ```
      VITE_TMDB_API_KEY=your_api_key
      VITE_TMDB_ACCESS_TOKEN=your_access_token
     ```

5. Start the development server:

   ```bash
     bun dev

   ```

6. Open your browser and go to http://localhost:5173 to view the application.

## Usage

- Explore the homepage to see trending movies and series.
- Use the search bar to find specific titles.
- Click on any movie or series to view detailed information and related content.
- Use filters to narrow down your search by genre, popularity, or release date.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- The Movie Database (TMDB) for providing the movie and series data.
- The open-source community for their valuable resources and inspiration.
