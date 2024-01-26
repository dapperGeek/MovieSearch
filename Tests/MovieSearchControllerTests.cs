using Microsoft.AspNetCore.Mvc;
using Moq;
using MovieSearch.Controllers;
using MovieSearch.Service;
using NUnit.Framework;
using System.Collections.Generic;

namespace MovieSearch.Tests
{
    public class MovieSearchControllerTests
    {
        [Test]
        public void SearchMovies_ValidTitle_ReturnsOkResult()
        {
            // Arrange
            var controller = new MovieSearchController();
            var mockExternalApiService = new Mock<ExternalApiService>();
            mockExternalApiService.Setup(x => x.Get(It.IsAny<string>())).Returns("{ \"Title\": \"Programming\", \"Year\": \"2022\", \"imdbID\": \"123\" }");

            // Act
            var result = controller.searchMovies("Programming", "1");

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
        }

        [Test]
        public void GetLastSearches_ReturnsOkResult()
        {
            // Arrange
            var controller = new MovieSearchController();

            // Act
            var result = controller.GetLastSearches();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
        }
    }
}
