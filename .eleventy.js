const Image = require('@11ty/eleventy-img');
const md = require('markdown-it')();

md.renderer.rules.image = function (tokens, idx, options, env, self) {
  const token = tokens[idx]
  let imgSrc = token.attrGet('src')
  const imgTitle = token.attrGet('title')
  const imgAlt = token.content

  const imgSize = '640px'
  
	const imgOpts = {
    widths: [640],
    formats: ['webp', 'jpeg'],
    urlPath: '/',
    outputDir: './_site/'
  }
  

	Image(imgSrc, imgOpts)
    const metadata = Image.statsSync(imgSrc, imgOpts)
    const generatedImage = Image.generateHTML(metadata, {
      alt: imgAlt,
      sizes: imgSize,
      loading: 'lazy',
      decoding: 'async'
    }, { whitespaceMode: "inline" })

    if (imgTitle) {
      return `<figure>
        ${generatedImage}
        <figcaption>${imgTitle}</figcaption>
      </figure>`
    }

    return generatedImage
  }
  
module.exports = (eleventyConfig) => {
    eleventyConfig.setLibrary('md', md)
};