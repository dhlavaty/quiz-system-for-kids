module.exports = {
  async redirects() {
    return [
      {
        source: '/twenty',
        destination: '/hundred',
        permanent: true,
      },
    ];
  },
};
