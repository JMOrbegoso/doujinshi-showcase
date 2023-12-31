package controller

import (
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/doujinshi/domain/repository"
	"gitea.jmorbegoso.com/jm/doujinshi-showcase/api/presentation/handler"
	"github.com/gin-gonic/gin"
)

func AddDoujinshiController(routerGroup *gin.RouterGroup, doujinshiRepository repository.DoujinshiRepository) {
	subRouterGroup := routerGroup.Group("/doujinshi")
	{
		subRouterGroup.GET("", handler.GetDoujinshiHandler(doujinshiRepository))

		subRouterGroup.GET("paginated", handler.GetDoujinshiPaginatedHandler(doujinshiRepository))

		subRouterGroup.GET(":id", handler.GetDoujinshiByIdHandler(doujinshiRepository))
	}
}
