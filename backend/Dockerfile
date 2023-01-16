# Use an official Python runtime as an image
FROM python:3.11

RUN apt update

RUN apt install sqlite3

# Set the working directory in the container
WORKDIR /backend

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application files into the container
COPY . .

# Expose the necessary port for the application
EXPOSE 5000

# Run app.py when the container launches
ENTRYPOINT ["python"]
CMD ["app.py"]