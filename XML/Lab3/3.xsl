<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
		<xsl:template match="/">
		<table border="3">
			<tbody>
				<tr>
					<th>CD Title</th>
				</tr>
					<xsl:for-each select="CATALOG/CD">
						<xsl:choose>
							<xsl:when test="PRICE > 10">
								<tr bgcolor="red">
									<td><xsl:value-of select="TITLE"/></td>
								</tr>
							</xsl:when>
							<xsl:otherwise>
								<tr bgcolor="green">
									<td><xsl:value-of select="TITLE"/></td>
								</tr>
							</xsl:otherwise>
						</xsl:choose>
				</xsl:for-each>
			</tbody>
		</table>
		</xsl:template>
</xsl:stylesheet>
