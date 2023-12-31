package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/jmorbegoso/doujinshi-showcase/api/doujinshi/domain/repository"
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/handler"
)

func AddDoujinshiController(routerGroup *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) {
	subRouterGroup := routerGroup.Group("/doujinshi")
	{
		subRouterGroup.GET("", handler.GetDoujinshiHandler(doujinshiRepository))

		subRouterGroup.GET("paginated", handler.GetDoujinshiPaginatedHandler(doujinshiRepository))

		subRouterGroup.GET(":id", handler.GetDoujinshiByIdHandler(doujinshiRepository))
	}
}
