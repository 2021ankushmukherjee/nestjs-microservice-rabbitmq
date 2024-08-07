
# BUILD FOR DEVELOPMENT

FROM node:20-alpine As development

USER node

# Create app directory

WORKDIR /nestjs-microservice/orders

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN yarn install

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
# USER node
# Start the server using the development build
CMD [ "yarn", "start:dev" ]


###################
# BUILD FOR PRODUCTION
###################
FROM development As build

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production 
# ensures that only the production dependencies are installed. This ensures that the node_modules 
# directory is as optimized as possible
# RUN npm ci --omit=dev && npm cache clean --force


###################
# PRODUCTION
###################
FROM node:20-alpine As production

WORKDIR /nestjs-microservice/orders

# RUN mkdir -p /pragati/data

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /nestjs-microservice/orders/node_modules ./node_modules
COPY --chown=node:node --from=build /nestjs-microservice/orders/dist ./dist

# Start the server using the production build
CMD [ "node", "./dist/main.js" ]