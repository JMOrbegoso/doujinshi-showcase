package api

import (
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/controller"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/middleware"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/swagger"

	"github.com/gin-gonic/gin"
)

func CreateApi(doujinshiRepository repository.DoujinshiRepository) (*gin.Engine, error) {
	// Set release mode in gin
	gin.SetMode(gin.ReleaseMode)

	// Create gin engine instance
	ginEngine := gin.Default()

	// Configure trusted proxies
	ginEngine.SetTrustedProxies(nil)

	// Add middlewares
	middleware.AddMiddlewares(ginEngine)

	// Add api controller groups
	apiEndpoints := ginEngine.Group("/api")
	{
		// Add Swagger endpoint
		swagger.AddSwagger(apiEndpoints)

		// Add health monitoring endpoints
		healthRouterGroup := apiEndpoints.Group("/health")
		{
			controller.AddHealthController(healthRouterGroup)
		}

		// Add library endpoints
		libraryRouterGroup := apiEndpoints.Group("/library")
		{
			controller.AddLibrariesController(libraryRouterGroup, doujinshiRepository)
		}

		// Add doujinshi endpoints
		doujinshiRouterGroup := apiEndpoints.Group("")
		{
			controller.AddArtistsController(doujinshiRouterGroup, doujinshiRepository)
			controller.AddCategoriesController(doujinshiRouterGroup, doujinshiRepository)
			controller.AddCharactersController(doujinshiRouterGroup, doujinshiRepository)
			controller.AddCirclesController(doujinshiRouterGroup, doujinshiRepository)
			controller.AddDoujinshiController(doujinshiRouterGroup, doujinshiRepository)
			controller.AddParodiesController(doujinshiRouterGroup, doujinshiRepository)
			controller.AddTagsController(doujinshiRouterGroup, doujinshiRepository)
			controller.AddUrlsController(doujinshiRouterGroup, doujinshiRepository)
		}
	}

	// Serve static images
	imageEndpoints := ginEngine.Group("images")
	{
		controller.AddImagesController(imageEndpoints, doujinshiRepository)
	}

	return ginEngine, nil
}
