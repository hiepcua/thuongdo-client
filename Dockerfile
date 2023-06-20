FROM ubuntu:18.04
MAINTAINER Thuongdo-China-Client
WORKDIR /root/app

RUN apt update -y
RUN apt install sudo
RUN sudo apt install curl -y
RUN sudo apt install git -y
RUN curl -fsSL https://deb.nodesource.com/setup_12.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
