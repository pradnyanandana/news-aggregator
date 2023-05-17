## News Aggregator

### Description

The News Aggregator is a web application that pulls data from three different APIs: [NewsAPI](https://newsapi.org), [New York Times](https://developer.nytimes.com/apis), and [The Guardian](https://open-platform.theguardian.com/documentation/). It provides users with a convenient way to access and browse news articles from various sources in a single platform.

### Features

- **API Integration**: The application integrates with the News API, New York Times API, and The Guardian API to fetch the latest news articles from multiple sources.
- **User Authentication**: Users can create accounts, log in, and securely access personalised features.
- **Preferences Customization**: Once logged in, users can customise their news preferences by selecting preferred sources, categories, and authors.
- **Advanced Search**: The application allows users to perform advanced searches by applying filters such as query, date range, and sources. This enables users to find specific news articles based on their interests.
- **User-Friendly Interface**: The user interface is designed to be intuitive and easy to navigate, providing a seamless browsing experience.
- **Responsive Design**: The application is responsive and optimised for various devices, including desktops, tablets, and mobile phones.

### Prerequisites

Make sure you have the following dependencies installed on your system:

- Docker
- Docker Compose

### Environment Variables

The project requires certain environment variables to be set to run correctly. These variables are usually stored in a `.env` file at the root of the project directory. However, since this file may contain sensitive information, such as API keys or database credentials, it is not included in the repository. Instead, a `.env.example` file is provided, a template for creating the actual `.env` file.

### Creating the .env File

To create the `.env` file, follow these steps:

1. Locate the `.env.example` file in the project directory.

2. Make a copy of the `.env.example` file and rename it to `.env`.
   ```
   cp .env.example .env
   ```

3. Open the `.env` file in a text editor.

4. Replace the placeholder values in the file with your configuration values. For example:
   ```
   DB_DATABASE=db
   DB_PASSWORD=pass
   DB_USERNAME=user

   NEWS_API=your_news_api_key
   NEW_YORK_TIMES_API=your_nyt_api_key
   THE_GUARDIAN_KEY=your_guardian_api_key
   ```

5. Save the changes to the `.env` file.

### Running the Project

Follow these steps to run the project on your local machine:

1. Clone the repository to your local machine.
   ```
   git clone https://github.com/pradnyanandana/news-aggregator.git
   ```

2. Navigate to the project directory.
   ```
   cd news-aggregator
   ```

3. Build the Docker images.
   ```
   docker-compose build
   ```

4. Start the project containers.
   ```
   docker-compose up
   ```

5. Access the application in your web browser.
   ```
   http://localhost:8000
   ```
   
6. To stop the project, use `Ctrl+C` in the terminal or run the following command:
   ```
   docker-compose down
   ```

### Configuration

If you need to change configuration settings, you can modify the values in the `.env` file accordingly. However, be cautious when modifying sensitive information, such as database credentials or API keys.

### Troubleshooting

If you encounter any issues while running the project, try the following steps:

- Ensure that you have the required dependencies installed.
- Double-check that the Docker daemon is running.
- Ensure that other services do not use the necessary ports on your machine.

If the issue persists, please seek assistance from the project maintainers.