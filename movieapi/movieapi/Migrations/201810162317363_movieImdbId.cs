namespace movieapi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class movieImdbId : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Movie", "ImdbId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Movie", "ImdbId");
        }
    }
}
