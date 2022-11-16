export default {

  methods: {
    handleFileUpload() {

      this.file = this.$refs.file.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.preview = e.target.result;
      }

      reader.readAsDataURL(this.file);
      reader.addEventListener("load", function () {
        this.imagePreview = reader.result;
      }.bind(this), false);
      return (this.file, this.url)
    }
  },

}