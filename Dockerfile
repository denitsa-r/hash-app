# Backend Dockerfile
FROM php:8.1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set environment variable to allow Composer plugins to run as superuser
ENV COMPOSER_ALLOW_SUPERUSER 1

# Copy composer.lock and composer.json
COPY composer.lock composer.json ./

RUN cat composer.lock

# Install dependencies
RUN composer install --no-interaction

# Copy the Laravel backend code into the container
COPY . /var/www/html
COPY . .

# Expose port 8000 and start the PHP server
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8000"]
