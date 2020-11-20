class ImgurBaseService {
  private imgurversion = "3";

  protected clientId = "58876dd57a2a7da";
  protected base_url = `https://api.imgur.com/${this.imgurversion}`;

  public getClientId() {
    return this.clientId;
  }
}

export default ImgurBaseService;
