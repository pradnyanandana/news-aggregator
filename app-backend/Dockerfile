FROM php:8.2-fpm-alpine

WORKDIR /var/www

RUN php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer
RUN docker-php-ext-install mysqli pdo pdo_mysql

COPY . /var/www

RUN composer install