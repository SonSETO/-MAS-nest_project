# 어떤 이미지를 사용할지
FROM node:alpine AS development

WORKDIR /usr/src/app

# package.json 복사해오기
COPY package*.json ./

# npm-lock.yaml
COPY package-lock.json ./

# Dependency 설치하기
RUN npm install

# 나머지 파일/폴더 복사해오기
COPY . .

# 커맨드 실행
CMD ["npm", "run", "start:dev", "order"]