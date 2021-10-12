export default interface ServerConfigInterface {
  name: string;
  jwt_secret: string;
  port: number;
  host: string;
  link: string;
}
