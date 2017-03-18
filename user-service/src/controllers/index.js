import randomRoute from './api/user';

export default function controllers(app) {
  app.use('/api/user', randomRoute);
}