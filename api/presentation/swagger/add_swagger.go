package swagger

import (
	"github.com/jmorbegoso/doujinshi-showcase/api/presentation/docs"

	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func AddSwagger(rg *gin.RouterGroup) {
	docs.SwaggerInfo.BasePath = "/"

	rg.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
}
